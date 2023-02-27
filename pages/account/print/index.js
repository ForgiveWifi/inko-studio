import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { useEffect, useState } from "react";
import axios from "axios";
import { showError } from "../../../components/ui/alerts";
import MyPagination from "../../../components/ui/MyPagination";
import ProductList from "../../../components/products/ProductList";
import Loading from "../../../components/ui/Loading";
import PrintDisplay from '../../../components/products/PrintDisplay';
import CloseButton from '../../../components/ui/CloseButton';
import Heading from '../../../components/ui/Heading';
import MyModal from '../../../components/ui/MyModal';
import { useRouter } from 'next/router';
import useEdit from "../../../components/ui/useEdit"
import useRefresh from "../../../components/ui/useRefresh"

function Prints() {

  const router = useRouter()

  const { edit, isEdit, openEdit, closeEdit } = useEdit()
  const [products, setProducts] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { change, refresh } = useRefresh()
  const [loading, setLoading] = useState(false)

  const page = router.query.page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/print?page=${page}&limit=11`)
        console.log(data)
        setProducts(data.data)
        setCurrentPage(parseInt(page))
        setTotalPages(data.pages)
        setLoading(false)
      }
      catch (err) {
        showError("design-error", "Problem getting prints", "Contact us!")
      }
    }
    fetchProducts()
  }, [page, change])

  return (
    <>
      <Loading loading={loading} />
      <MyModal open={isEdit} size="lg">
        <CloseButton onClick={closeEdit} />
        <div style={{ margin: 30 }}>
          <PrintDisplay product={products ? products[edit] : null} close={() => setSelected(null)} refresh={() => setRefresh(!refresh)} />
        </div>
      </MyModal>
      <Heading text="Prints" />
      <ProductList products={products} openEdit={openEdit} />
      <MyPagination currentPage={currentPage} setPage={(page) => router.push(`products?page=${page}`)} totalPages={totalPages} />
    </>
  );
}

export default withPageAuthRequired(Prints)
