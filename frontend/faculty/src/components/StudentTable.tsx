import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import classNames from "classnames";

const sectionColors = {
  CS03: "bg-blue-100 text-blue-700",
  CS04: "bg-green-100 text-green-700",
  // Add more section colors if needed
};

const StudentTable = ({ data }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Roll No.</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.rollNo}</TableCell>
              <TableCell>
                <span
                  className={classNames(
                    "inline-block px-2 py-1 text-sm font-medium rounded-full",
                    sectionColors[student.section] || "bg-gray-100 text-gray-700"
                  )}
                >
                  {student.section}
                </span>
              </TableCell>
              <TableCell>{student.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
