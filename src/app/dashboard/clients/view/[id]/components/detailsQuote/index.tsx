import { IQuote } from '@/app/dashboard/activities/interface/quote'
import './index.scss'
import { StatisticsCard } from '@/components/StatisticsCard'
import cashIcon from '@/assets/icons/cash.svg'
import certificateIcon from '@/assets/icons/certificate_icon.svg'

import { formatPrice } from '@/utils/formatPrice'
import { ClientQuoteRecords } from '../tableQuotes/records'
import { Spinner } from '@/components/Spinner'

interface IProps {
  quotes: IQuote[]
  quoteInformation: {
    totalInvoice: number
    quoteRejected: number
  }
  currentPage: number
  pagination: {
    current_page: number
    total_pages: number
    total_data: number
  }
  setCurrentPage: any
  loading: boolean
}

export const DetailClientQuote = ({
  quotes,
  quoteInformation,
  currentPage,
  pagination,
  setCurrentPage,
  loading,
}: IProps) => {
  return (
    <div className="detail-client-quote">
      <section className="detail-client-quote__information">
        <StatisticsCard
          title="Total de facturados"
          contentValue={formatPrice(quoteInformation?.totalInvoice)}
          className="total-invoice"
          backgroundHeaderIcon="#e7f9f5"
          headerIcon={cashIcon}
        />
        <StatisticsCard
          title="Cotizaciones rechazadas"
          contentValue={quoteInformation?.quoteRejected.toLocaleString()}
          className="quote-rejected"
          backgroundHeaderIcon="#f5e7f9"
          headerIcon={certificateIcon}
        />
      </section>
      <section className="detail-client-quote__quotes">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <ClientQuoteRecords
            handleDeleteClient={() => {}}
            records={quotes}
            currentPage={currentPage}
            pagination={pagination}
            setCurrentPage={setCurrentPage}
            loading={loading}
          />
        )}
      </section>
    </div>
  )
}
