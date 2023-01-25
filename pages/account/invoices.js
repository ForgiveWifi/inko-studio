import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import axios from "axios";
import InvoicesHeading from "../../components/invoices/InvoicesHeading"
import InvoiceList from "../../components/invoices/InvoiceList"
import InvoiceDisplay from '../../components/invoices/InvoiceDisplay';
import { useState, useEffect } from 'react';
import { showError } from '../../components/ui/alerts';
import CloseButton from '../../components/ui/CloseButton';
import Heading from '../../components/ui/Heading';
import MyModal from '../../components/ui/MyModal';
import { useRouter } from 'next/router';
import RefreshIcon from '@mui/icons-material/Refresh';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function Invoices() {

  const router = useRouter()
  const [invoices, setInvoices] = useState(null)
  const [selected, setSelected] = useState(null)
  const [hasMore, setHasMore] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const {page, starting_after, ending_before } = router.query

  useEffect(() => {
    fetchInvoices() 
    async function fetchInvoices() {
      try {
        setLoading(true)
        const params = starting_after ? `&starting_after=${starting_after}` : ending_before ? `&ending_before=${ending_before}` : ""
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoices?limit=8${params}`) 
        setInvoices(data.data)
        setHasMore(data.has_more) 
        setLoading(false)
      }
      catch (err) {
        showError("invoices", "Server error - invoices", "Contact us!") 
      }
    }
  }, [router.query])

  function nextPage() {
    router.push(`invoices?page=${parseInt(page || 1) + 1}&starting_after=${invoices.pop().id}`)
  }

  function lastPage() {
    router.push(`invoices?page=${parseInt(page || 1) - 1}&ending_before=${invoices.shift().id}`)
  }

  const modal = selected !== null

  const orange = {fill: "#FF9244"}
  const box = { width: 30, height: 30 }

  return (
    <>
      <MyModal open={modal} size="xl">
        {
          modal ? 
          <>
            <CloseButton onClick={() => setSelected(null)} />
            <InvoiceDisplay invoice={invoices[selected]}/>
          </> :
          null
        }
      </MyModal>
      <div className="flexbox-row full-width"> 
        <Heading text="Invoices" />
        <button onClick={() => router.push("invoices?page=1")} className="flexbox white-background radius5 margin-right" style={{ width: 35, height: 35, marginTop: "auto", marginBottom: 10}}>
          <RefreshIcon style={orange} />
        </button>
      </div>
      <InvoicesHeading />
      <InvoiceList loading={loading} invoices={invoices} setSelected={setSelected}/>
      <div className="flexbox full-width" style={{ maxWidth: 300 }}>
        <div className='flexbox-row margin-auto' style={{ gap: 10, marginTop: 10 }}>
          { 
            starting_after || (ending_before && hasMore) ? 
            <NavButton icon={<NavigateBeforeIcon style={orange}/>} onClick={() => lastPage()} /> :
            <div style={box}></div>
          }
          <h4>Page: {page}</h4>
          { 
            ending_before || (starting_after && hasMore) || (!(starting_after && ending_before) && hasMore) ? 
            <NavButton icon={<NavigateNextIcon style={orange} />} onClick={() => nextPage()} /> :
            <div style={box}></div>
          }
        </div>
      </div>
    </>
  );

  function NavButton({icon, onClick}) {
    return(
      <button className="flexbox white-background max-radius" style={box} onClick={onClick}>
        {icon}
      </button> 
    )
  }
}



export default withPageAuthRequired(Invoices)
