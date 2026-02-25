import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

// rfc
function CheckPayment() {
  const [params] = useSearchParams();
  const orderReference = params.get("order_reference");
  const paymentReference = params.get("payment_reference");
  const [isOrderPaid, setIsOrderPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + `/check-payment?orderReference=${orderReference}&paymentReference=${paymentReference}`)
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        setIsOrderPaid(json.paid);
      })
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* {orderReference}
      <br />
      {paymentReference} */}
      {isOrderPaid ?
        <div>Tellimus {orderReference} on edukalt makstud</div> :
        <div>Tellimus {orderReference} jäi mingil põhjusel maksmata</div>
     }
    </div>
  )
}

export default CheckPayment