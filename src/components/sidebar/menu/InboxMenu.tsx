import React from 'react'

const InboxMenu = () => {
  return (
    <div>
      <Item/>
      <Item/>
    </div>
  )
}

export default InboxMenu

const Item = () => {
  return (
    <div className="border-b p-3 hover:bg-gray-100 transition-colors duration-300">
      <div className="flex">
        <input type="checkbox" className="self-center" />
        <div className="ml-2">
          <div className="font-semibold">Amit RG</div>
          <div className="text-xs font-medium">Facebook Product</div>
        </div>
        <span className="ml-auto text-sm">10m</span>
      </div>
      <div className="mt-2 text-xs">
        <div className=" font-semibold">Awesome Product</div>
        <div className="text-gray-500">
          Hey there ! I prbaly did one of the best the app...
        </div>
      </div>
    </div>
  );
}

