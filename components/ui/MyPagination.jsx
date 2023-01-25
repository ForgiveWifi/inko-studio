import { Pagination } from "@mantine/core"

function MyPagination({currentPage, setPage, totalPages}) {
  if (!totalPages || totalPages <= 1) {
    return null
  }
  else return (
    <div className="background1 max-radius" style={{ padding: " 8px 10px", marginTop: "15px" }}>
      <Pagination page={currentPage} onChange={setPage} total={totalPages} color="orange" withControls={false} size="md" radius="xl" />
    </div>
  );
}

export default MyPagination;