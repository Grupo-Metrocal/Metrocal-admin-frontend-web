import { ICMC } from "../../../interface/p-01";
interface IProps {
  cmc: ICMC
}

export const TableCMC = ({ cmc }: IProps) => {
  return (
    <table className="bg-white p-4"
      style={{
        marginTop: '4.75em',
      }}
    >
      <thead>
        <tr className="bg-slate-200">
          <th className="p-4">Punto #</th>
          <th>Pref</th>
          <th>U95=kun(E)</th>
          <th>CMC</th>
          <th>CMC min</th>
        </tr>
      </thead>
      <tbody className="bg-slate-100 text-[#333]">
        {
          cmc.cmcPoint.map((item, index) => (
            <tr key={index} className="text-center border">
              <td className="p-2">{item}</td>
              <td>{cmc.cmcPref[index]}</td>
              <td>{cmc.uncertaintyCMC[index]}</td>
              <td>{cmc.cmc[index]}</td>
              <td>{cmc.uncertaintyCMC[index]}</td>
            </tr>
          ))
        }
      </tbody>
    </table >
  )
}