import loadingStore from "@/zustand/loading.store";

export default function Loading() {
  let { loading } = loadingStore((state) => state);
  return <>{loading && <div>sb</div>}</>;
}
