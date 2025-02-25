import { useState, useEffect } from "react";
import { subscribeUser } from "./actions";
import { api } from "../_utils/api";
import { PostRequest } from "../_types/PushSubscription/PostRequest";
import { useUser } from "./useUser";

export const useServiceWorker = () => {
  const { data } = useUser();
  const [isSupported, setIsSupported] = useState(false);
  const [isDisplay, setIsDisplay] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    //ブラウザがサービスワーカーをサポートしているか確認
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
    }
    if (!data) return;
    if (!data.user) return;
    if (data.user.pushSubscription) {
      setIsDisplay(false);
    }
  }, [data]);
  // ArrayBuffer を Base64 に変換する関数
  const arrayBufferToBase64 = (buffer: ArrayBuffer | null): string => {
    if (!buffer) return "";
    const bytes = new Uint8Array(buffer);
    let binary = "";
    bytes.forEach(b => (binary += String.fromCharCode(b)));
    return btoa(binary);
  };
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  //サービスワーカーに登録
  const registerServiceWorker = async () => {
    setIsSubmitting(true);
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    // サブスクリプションがない場合は新たに作成
    if (!sub) {
      await subscribeToPush();
    } else {
      try {
        const requestBody: PostRequest = {
          endpoint: sub.endpoint,
          auth: arrayBufferToBase64(sub.getKey("auth")),
          p256dh: arrayBufferToBase64(sub.getKey("p256dh")),
        };
        await api.post<PostRequest, { message: string }>(
          `/api/user/push_subscription`,
          requestBody
        );
      } catch (e) {
        console.error(e);
        alert("サブスクリプション登録に失敗しました");
      } finally {
        setIsSubmitting(false);
      }
    }
    setIsDisplay(false);
  };

  //新しいプッシュ通知のサブスクリプションを作成
  //取得したサブスクリプションをDB保存するために subscribeUser を呼び出し
  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser(serializedSub);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isSupported,
    registerServiceWorker,
    isDisplay,
    setIsDisplay,
    isSubmitting,
  };
};
