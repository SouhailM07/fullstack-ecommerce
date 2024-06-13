import loadingStore from "@/zustand/loading.store";

export default function Loading() {
  let { loading } = loadingStore((state) => state);
  return (
    <>
      {loading && (
        <div className="gridCenter bg-[#00000087] fixed z-[100] h-screen w-full top-0">
          <div className="h-[7rem] aspect-square animate-spin border-transparent border-t-indigo-500 border-[0.7rem] rounded-full" />
        </div>
      )}
    </>
  );
}
