import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({
  title,
  companions,
  classNames,
}: CompanionsListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <h2 className="font-semibold text-3xl text-gray-800 mb-4">{title}</h2>

      <Table className="min-w-full bg-white rounded-lg shadow-md">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-lg font-semibold text-gray-600 py-3">Lessons</TableHead>
            <TableHead className="text-lg font-semibold text-gray-600 py-3">Subject</TableHead>
            <TableHead className="text-lg font-semibold text-gray-600 py-3 text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration }) => (
            <TableRow key={id} className="hover:bg-gray-50 transition duration-200">
              <TableCell>
                <Link href={`/companions/${id}`}>
                  <div className="flex items-center gap-3 py-3">
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-lg max-md:hidden"
                      style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                      <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-xl text-gray-800">{name}</p>
                      <p className="text-sm text-gray-500">{topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="subject-badge w-fit max-md:hidden py-2 px-4 rounded-full bg-gray-100 text-gray-700 capitalize">
                  {subject}
                </div>
                <div
                  className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                  style={{ backgroundColor: getSubjectColor(subject) }}
                >
                  <Image
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={18}
                    height={18}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 w-full justify-end">
                  <p className="text-xl text-gray-800">
                    {duration} <span className="max-md:hidden">mins</span>
                  </p>
                  <Image
                    src="/icons/clock.svg"
                    alt="minutes"
                    width={14}
                    height={14}
                    className="md:hidden"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
