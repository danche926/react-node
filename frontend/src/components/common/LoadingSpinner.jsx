export default function LoadingSpinner({ text = "加载中..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-3">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}
