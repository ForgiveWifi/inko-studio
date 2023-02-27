import axios from "axios"
import { useState, useEffect, forwardRef } from "react"
import MyPagination from "../../ui/MyPagination"
import MyModal from "../../ui/MyModal"
import CloseButton from "../../ui/CloseButton"
import EditStock from "./EditStock"
import useEdit from "../../ui/useEdit"
import { Select } from "@mantine/core"
import useSizes from "../size/useSizes"
import useColors from "../color/useColors"
import useStyles from "../style/useStyles"
import Loading from "../../ui/Loading"
import GarmentList from "./GarmentList"
import AddButton from "../../ui/AddButton"
import NewGarment from "./NewGarment"
import useRefresh from "../../ui/useRefresh"
import { showError } from "../../ui/alerts"
import { ClearIcon } from "../../ui/Icons"
import usePallets from "../pallet/usePallets"
import useTags from "../tags/useTags"

function Stock() {

  const [garments, setGarments] = useState(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(null)
  const { edit, isEdit, closeEdit, openEdit } = useEdit()

  const [filter, setFilter] = useState({})
  const { style, color, size } = filter
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const { change, refresh } = useRefresh()
  const { styles } = useStyles()
  const { colors } = useColors()
  const { sizes } = useSizes({})
  const { pallets } = usePallets(null, "garment")
  const { tags } = useTags()

  function handleFilter(field, value) {
    setFilter({ ...filter, [field]: value })
    setPage(1)
  }

  useEffect(() => {
    fetchGarments()
    async function fetchGarments() {
      try {
        setLoading(true)
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/garment?page=${page}&limit=24&style=${style || ''}&color=${color || ''}&size=${size || ''}`)
        setGarments(data.garments)
        setTotal(data.total)
        setLoading(false)
      }
      catch {
        showError("fetch-garments", null, "Problem fetching garments!")
      }
    }
  }, [page, change, style, color, size])

  function formatStyles(styles) {
    if (styles) {
      return (styles.map(style => {
        return ({
          label: `${style.sku} - ${style.name}`,
          value: style.sku,
        })
      }))
    } else {
      return []
    }
  }

  function formatColors(colors) {
    if (colors) {
      return (colors.map(color => {
        const { id, name, hex } = color
        return ({
          name: name,
          hex: hex,
          label: name,
          value: id,
        })
      }))
    } else {
      return []
    }
  }
  return (
    <>
      <Loading loading={loading} />
      <MyModal open={isEdit} size="sm">
        <CloseButton onClick={closeEdit} />
        <EditStock garment={garments ? garments[edit] : null} refresh={refresh} close={closeEdit} pallets={pallets} tags={tags} />
      </MyModal>
      <MyModal open={modal} size="md">
        <CloseButton onClick={() => setModal(false)} />
        <NewGarment refresh={refresh} />
      </MyModal>
      <div className="flexbox-column full-width" style={{ marginBottom: 150 }}>
        <h1>Stock List</h1>
        <div className="flexbox-row margin-right" style={{ gap: 10, marginBottom: 20 }}>
          <Select value={style} onChange={value => handleFilter("style", value)} data={formatStyles(styles)} style={{ width: 300 }} searchable nothingFound="No styles" rightSection={!style ? null : <ClearIcon onClick={() => handleFilter("style", "")} />} rightSectionWidth={30} />
          <Select value={color} onChange={value => handleFilter("color", value)} data={formatColors(colors)} itemComponent={ColorItem} searchable nothingFound="No colors" rightSection={!color ? null : <ClearIcon onClick={() => handleFilter("color", "")} />} rightSectionWidth={30} />
          <Select value={size} onChange={value => handleFilter("size", value)} data={sizes || []} style={{ width: 100 }} searchable nothingFound="No sizes" rightSection={!size ? null : <ClearIcon onClick={() => handleFilter("size", "")} />} rightSectionWidth={30} />
          <AddButton onClick={() => setModal(true)} text="NEW STOCK" />
        </div>
        <GarmentList garments={garments} openEdit={openEdit} />
        <MyPagination currentPage={page} setPage={setPage} totalPages={total} />
      </div>
    </>
  );
}

const ColorItem = forwardRef(
  ({ name, hex, ...others }, ref) => (
    <>
      <button ref={ref} {...others} className="flexbox-row full-width radius5" style={{ height: 50 }}>
        <div className="shadow2 max-radius" style={{ backgroundColor: hex, width: 30, height: 30, marginRight: 10 }}></div>
        <div className="grey-text">{name}</div>
      </button>
      <div className="full-width grey-background max-radius" style={{ height: 1, }}></div>
    </>
  )
)

export default Stock;