interface IProps {
  title: string
  message: string
}

export const Backdrop = ({ title, message }: IProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <h2 className="mt-4 text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-sm text-gray-600 text-center">{message}</p>
      </div>
    </div>
  )
}
