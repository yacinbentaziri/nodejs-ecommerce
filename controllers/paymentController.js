import axios from "axios"

export const send = async (req, res) => {
    try {
        const url = 'https://developers.flouci.com/api/generate_payment'
        const payload = {
            "app_token": "1b4bd212-f931-4467-bb41-a54137751d41",
            "app_secret": process.env.FLOUCI_SECRET,
            "amount": req.body.amount,
            "accept_card": "true",
            "session_timeout_secs": 1200,
            "success_link": "http://localhost:3000/paymentstatus",
            "fail_link": "http://localhost:3000/paymentstatus",
            "developer_tracking_id": "8fcc35e0-6b66-4a89-8e09-12e9029e47c9"
        }
        const resp = await axios.post(url, payload)
        res.status(200).json({
            success: true,
            data: resp.data
        })
        /*.then(result => {
            res.send(result.data)
        })
        .catch(err => {
            console.log(err)
        })*/
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}

export const verify = async (req, res) => {
    try {
        const url = "https://developers.flouci.com/api/verify_payment/" + req.params.paymentid
        const headers = {
            'Content-Type': 'application/json',
            'apppublic': '1b4bd212-f931-4467-bb41-a54137751d41',
            'appsecret': process.env.FLOUCI_SECRET
        }
        const resp = await axios.get(url, { headers: headers })
        res.status(200).json({
            success: true,
            data: resp.data
        })

    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}