export const formatSteps = (input: string) => {
  return input
    .replace(/###STEP(\d+)###/g, "$1, ")
    .replace(/###TIPS(.+?)###/g, "$1 ");
};

export const parseSteps = (
  input: string
): { index: string; text: string }[] => {
  return Array.from(
    input.matchAll(
      /###(STEP)(\d+)###([\s\S]+?)(?=###(?:STEP|TIPS)|$)|###(TIPS)(.+?)###([\s\S]+?)(?=###(?:STEP|TIPS)|$)/g
    )
  ).map(match => {
    if (match[1] === "STEP") {
      return { index: match[2], text: match[3].trim() };
    } else {
      return { index: match[5], text: match[6].trim() };
    }
  });
};
