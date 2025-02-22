"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MaltArticle } from "@/app/_types/Admin/IndexResponse";
import dayjs from "dayjs";
import { SelectRole } from "./SelectRole";
import { getStatusLabel } from "@/app/_utils/getStatusLabel";
import { SelectMainMalt } from "./SelectMainMalt";
import { PublishButton } from "./PublishButton";
interface Props {
  maltData: MaltArticle[];
}
export const Table: React.FC<Props> = ({ maltData }) => {
  const columnHelper = createColumnHelper<MaltArticle>();
  const columns = [
    columnHelper.accessor("createdAt", {
      header: "作成日",
      cell: info => dayjs(info.getValue()).format("YYYY/M/D"),
    }),
    columnHelper.accessor("title", {
      header: "麹調味料名",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("maltRole", {
      header: "ロール",
      cell: info => {
        return (
          <SelectRole
            value={info.getValue()}
            articleId={info.row.original.id}
          />
        );
      },
    }),
    columnHelper.accessor("mainMaltArticle.id", {
      header: "親麹調味料",
      cell: info => {
        const role = info.row.original.maltRole;
        const articleId = info.row.original.id;
        if (role === "MAIN") {
          return <div className="text-center">-</div>;
        }
        return <SelectMainMalt value={info.getValue()} articleId={articleId} />;
      },
    }),
    columnHelper.accessor("status", {
      header: "ステータス",
      cell: info => (
        <PublishButton
          article={info.row.original}
          label={getStatusLabel(info.getValue())}
        />
      ),
    }),
    columnHelper.accessor("user.name", {
      header: "申請者",
      cell: info => info.getValue(),
    }),
  ];
  const table = useReactTable({
    data: maltData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="mx-auto pt-3 px-1 w-full">
      <table className="table-fixed mb-10 w-full">
        <thead className="bg-light_beige">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const headerContent = flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                );
                return (
                  <th
                    key={header.id}
                    className={`p-2 text-left font-normal text-xs`}
                  >
                    {headerContent}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b-[1px] border-gray_bg cursor-pointer"
            >
              {row.getVisibleCells().map(cell => {
                const columnContent = flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                );
                return (
                  <td key={cell.id} className={`p-1 font-normal text-xs`}>
                    {columnContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
