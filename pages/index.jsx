import { getCode } from '../firebase/utils'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context'
import Particles from '../components/Particles'

import { WithAuth } from '../HOCs/WithAuth'
import Layout from '../layout/Layout'
import Error from '../components/Error'
import Figure from '../components/Figure'

import Success from '../components/Success'

import Modal from '../components/Modal'
import Button from '../components/Button'
import QRCode from "qrcode.react";
import Link from 'next/link'
import { PDFDownloadLink } from "@react-pdf/renderer";

import style from '../styles/Home.module.css'
import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../components/pdf"), {
  ssr: false,
});

function Home() {
  const { user, userDB, setUserProfile, qr, setQr, setDataUrl, setUserSuccess, success, setUserData, pageOne, pageTwo, pageThree, handlerPageView, numeration, image } = useUser()
  const router = useRouter()

  const [mode, setMode] = useState(false)

  const [arr, setArr] = useState([1, 2, 3])
  const [pluss, setPluss] = useState(false)


  const [opacity, setOpacity] = useState(false);



  function nextClick(e) {
    e.preventDefault()
    if (!navigator.onLine) {
      setUserSuccess('NoInternet')
      return
    }
    const code = e.target.form[0].value
    console.log(code)
    getCode(code, user.uid, setUserSuccess)
  }

  function backClick(e) {
    e.preventDefault()
    router.p()
  }

  function arrItemsHandler() {
    if (arr.length > 2) {
      return
    }
    const copyListItems = [...arr]
    const arrPop = copyListItems.pop()
    setArr([...arr, arrPop == undefined ? 1 : arrPop + 1])
  }
  function handlerQR() {
    setQr(true)
  }
  function plussButton(key) {
    setPluss(!pluss)
  }

  function remove(id) {
    const newArr = arr.filter(i => i !== id)
    console.log(newArr)
    setArr(newArr)
  }

  function remove(data) {
    handlerPageView(data)
  }
  function removeQR() {
    setQr(!qr)
  }


  const [is, setIs] = useState(false);
  function handlerPDF() {
setIs(true)


    // const downloadDoc = document.createElement('a')

    // downloadDoc.href = '/PDFdoc'

    // downloadDoc.click()

    // document.body.appendChild(downloadDoc)


    

    // userDB.users[user.uid] && userDB.users[user.uid].uid
    // ? router.push('/PdfViewer')
    // : setUserSuccess('RequireCodeActivation')

    // router.push('/PdfViewer')
  }
  function x() {
    setMode(!mode)
  }



  const handlerQRUrl = (e) => {
    const qr = e.target.value
    setQr(qr)

  };

  console.log()
  console.log(user)
  



  useEffect(() => {
    document.getElementById('qr') && setDataUrl(document.getElementById('qr').toDataURL())
  }, [qr]);

  return (
    <>
     <iframe height={1000} width={500} src="https://collage-two.vercel.app" />

    </>
  )
}

export default WithAuth(Home) 
