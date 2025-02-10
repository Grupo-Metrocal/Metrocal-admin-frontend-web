export interface IMethodName {
  method:
    | 'NI-MCIT-B-01'
    | 'NI-MCIT-D-01'
    | 'NI-MCIT-D-02'
    | 'NI-MCIT-M-01'
    | 'NI-MCIT-P-01'
    | 'NI-MCIT-T-01'
    | 'NI-MCIT-T-03'
    | 'NI-MCIT-T-05'
    | 'NI-MCIT-V-01'
    | 'GENERIC_METHOD'
    | 'all'
}

const methodNamesMap: Record<IMethodName['method'], string> = {
  'NI-MCIT-B-01': 'NI-MCIT-B-01',
  'NI-MCIT-D-01': 'NI-MCIT-D-01',
  'NI-MCIT-D-02': 'NI-MCIT-D-02',
  'NI-MCIT-M-01': 'NI-MCIT-M-01',
  'NI-MCIT-P-01': 'NI-MCIT-P-01',
  'NI-MCIT-T-01': 'NI-MCIT-T-01',
  'NI-MCIT-T-03': 'NI-MCIT-T-03',
  'NI-MCIT-T-05': 'NI-MCIT-T-05',
  'NI-MCIT-V-01': 'NI-MCIT-V-01',
  GENERIC_METHOD: 'Comp. Directa Trazable',
  all: 'Condiciones Ambientales',
}

export const formatMethodName = ({ method }: IMethodName): string => {
  return methodNamesMap[method] || method
}
