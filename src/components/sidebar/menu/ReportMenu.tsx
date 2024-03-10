import React from 'react'
import { MdOutlineSort } from 'react-icons/md';
import { RxReload } from 'react-icons/rx';

const ReportMenu = () => {
  return (
    <div className="w-[300px] h-full border-r border-b">
      <div className="flex items-center gap-2 p-4 border-b">
        <MdOutlineSort color="gray" />
        <span className="text-xl font-semibold">Report</span>
        <RxReload className="ml-auto" />
      </div>
    </div>
  );
}

export default ReportMenu
