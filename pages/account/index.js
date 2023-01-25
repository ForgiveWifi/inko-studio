import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/ui/Loading"
import AddressForm from "../../components/account/AddressForm";
import { showError, showLoading, updateError, updateSuccess } from "../../components/ui/alerts";
import { TextInput } from "@mantine/core";
import isEqual from 'lodash.isequal'
import AccountLayout from '../../layouts/AccountLayout';
import Heading from "../../components/ui/Heading"
import ShippingSelect from '../../components/ui/ShippingSelect';
import EditButtons from '../../components/ui/EditButtons';

function Account() {

  const AccountBlank = {
    first_name: "",
    last_name: "",
    company: ""
  }
  const ShippingBlank = {
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: ""
  }

  const { user } = useUser()
  const [account, setAccount] = useState(AccountBlank)
  const [accountRef, setAccountRef] = useState(AccountBlank)
  // const [address, setAddress] = useState({})
  const [shipping, setShipping] = useState(ShippingBlank)
  const [shippingRef, setShippingRef] = useState(ShippingBlank)
  const [loading, setLoading] = useState(false)

  const save = (!isEqual(account, accountRef) || !isEqual(shipping, shippingRef)) && !loading

  useEffect(() => {
    getAccount()
    async function getAccount() {
      try {
        setLoading(true)
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/account`)
        console.log(data)
        const { first_name, last_name, company, shipping_provider } = data.metadata
        const account = {
          first_name: first_name || "",
          last_name: last_name || "",
          company: company || "",
          shipping_provider: shipping_provider || ""
        }
        setAccount(account)
        setAccountRef(account)
        if (data.shipping) {
          setShipping(data.shipping.address)
          setShippingRef(data.shipping.address)
        }
        setLoading(false)
      }
      catch (err) {
        console.log(err)
        showError("account", "Server error: account", "Contact Us!")
      }
    }
  },[])

  async function edit() {
    try {
      showLoading("shipping", null, "Saving...")
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/account`, { 
        // address: address,
        shipping: shipping, 
        metadata: account
      })
      setAccountRef(account)
      setShippingRef(shipping)
      updateSuccess("shipping", null, "Changes has been saved!") 
    }
    catch (err) {
      updateError("shipping", null, "Problem saving.  Contact us!") 
    }
  }

  function revert() {
    setAccount(accountRef)
    setShipping(shippingRef)
  }

  return (
    <>
      { loading ? <Loading /> : null}
      {
        user && 
        <div className="flexbox-column-start full-width">
          <Heading text="Account" />
          <div className="flexbox-row" style={{ marginBottom: 15 }}>
            <h5 style={{ marginRight: 15}}>email:</h5>
            <div>{user.email}</div>
          </div>
          <div style={{maxWidth: 250}}>
          
          <TextInput 
            label="first name"
            value={account.first_name}
            onChange={(e) => setAccount({...account, first_name: e.currentTarget.value})}
            error={false}
            autoComplete="off"
          />
          <TextInput 
            label="last name"
            value={account.last_name}
            onChange={(e) => setAccount({...account, last_name: e.currentTarget.value})}
            error={false}
            autoComplete="off"
          />
          <TextInput
            label="company"
            value={account.company}
            onChange={(e) => setAccount({...account, company: e.currentTarget.value})}
            error={false}
            autoComplete="off"
          />
          </div>
          <h3 style={{ marginTop: 30}}>Shipping Address</h3>
          <AddressForm shipping={shipping} setShipping={setShipping} error={false} />
          {/* <h2>Address</h2>
          <AddressForm shipping={address} setShipping={setAddress} error={error} /> */}
          <h3 style={{ marginTop: 30}}>Shipping Provider</h3>
          <ShippingSelect value={account.shipping_provider}  onChange={(v) => setAccount({...account, shipping_provider: v})}/>
          <div style={{ height: 100 }}>
          {
            save &&
            <EditButtons cancel={revert} edit={edit}/>
          }
          </div>
        </div>
      }
    </>
  );
}

export default withPageAuthRequired(Account)

