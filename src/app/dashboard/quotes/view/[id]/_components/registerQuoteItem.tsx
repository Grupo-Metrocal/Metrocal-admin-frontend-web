import { IQuote } from "../../../requests/[id]/page";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import messageIcon from '@/assets/icons/comment.svg'
import Image from "next/image";
import { handleGeneratePDFromModifiedQuoteList } from "@/utils/downloadPDFromModifiedQuoteList";

interface IProps {
  quote: IQuote
  index: number
}

export const RegisterQuoteItem = ({ quote, index }: IProps) => {
  return (
    <div className="shadow-lg w-60 p-4 rounded flex flex-col gap-2 relative">
      <div className="flex justify-between gap-2 items-center">
        <h3 className="text-base">{quote.no}</h3>
        <Popover>
          <PopoverTrigger>
            <Image src={messageIcon} alt="Icono Mensaje de modificación" width={20} />
          </PopoverTrigger>
          <PopoverContent className="bg-white p-4 shadow-lg w-full z-20">
            <p className="w-96">{quote.quote_modification_message || 'No hay mensjae'}</p>
          </PopoverContent>
        </Popover>
      </div >


      <div className="flex justify-between gap-2 items-center">
        <span className="text-gray-400">{formatDate(quote.updated_at)}</span>

        <Button variant={"outline"} onClick={async () => {
          return await handleGeneratePDFromModifiedQuoteList({
            id: quote.id,
            no: quote.no,
            company_name: quote.client.company_name,
            index
          })
        }}>
          <Download width={17} />
        </Button>
      </div>
    </div >
  )
}