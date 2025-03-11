import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { selectCurrentOrderId, selectOrderLoading } from '@/store/order/order.selector'
import { finalizeOrderStart } from '@/store/order/orderSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const PaypalPaymentReturnPage = () => {
    const dispatch = useDispatch()
    const orderId = useSelector(selectCurrentOrderId)
    const loading = useSelector(selectOrderLoading)
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const paymentId = params.get("paymentId")
    const payerId = params.get("PayerID")

    useEffect(() => {
        if(orderId && !loading){
            dispatch(finalizeOrderStart({paymentId, payerId, orderId, navigate}))
        }
    }, [])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Processing payment... Please wait</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PaypalPaymentReturnPage