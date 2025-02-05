import Link from "next/link";
import { NAV_MENU_SETTINGS } from "../constants/settingsItems";

export const RendererNavSettings = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {
        NAV_MENU_SETTINGS.map((item, index) => (
          <Link key={index} href={item.href} className="bg-white shadow-lg p-6 flex flex-col gap-4 items-center justify-center rounded-lg hover:bg-[#0199d4] hover:text-white transition-all ">
            <span>
              <item.icon />
            </span>
            <span className="font-bold text-center">{item.name}</span>
          </Link>
        ))
      }
    </div>
  )
}