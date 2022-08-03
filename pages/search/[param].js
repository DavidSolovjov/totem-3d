import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from "../navbar/index"
import Footer from '../footer'
import polygon from "../../images/polygon-matic-logo.png"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import music from "../../images/Icon awesome-music.svg"
import movies from "../../images/Icon material-local-movies.svg"
import games from "../../images/Icon metro-gamepad.svg"
import sports from "../../images/Icon awesome-football-ball.svg"
import comics from "../../images/Icon awesome-book-open.svg"
import art from "../../images/Icon map-art-gallery.svg"
export default function Home() {
  const router = useRouter();
  const [lastDrop2, setLastDrop2] = useState([])
  const [brands, setBrands] = useState([])
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [loadingBrand, setLoadingBrand] = useState(true)
  useEffect(() => {

    if (!router.isReady) return;
    setLoadingProduct(true)
    setLoadingBrand(true)
    setLastDrop2([])
    setBrands([])
    axios.get(`https://shop.totem-universe.io/product?q=${router.query.param}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      console.log(data.data);
      setLoadingProduct(false)
      setLastDrop2(data.data.result)
    }).catch(function (error) {
      console.log(error.request);
    })
    axios.get(`https://shop.totem-universe.io/brand?q=${router.query.param}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      setLoadingBrand(false)
      setBrands(data.data)
    }).catch(function (error) {
      console.log(error.request);
    })
  }, [router.isReady, router])
  const checkURLisValid = (url) => {
    return url && url.includes('http') && url;
  }
  return (
    <div style={{ fontFamily: "Poppins", backgroundColor: "#0D0F23", color: "#919CC1" }} className='text-sm flex flex-col items-center'>
      <div className='max-w-7xl'>

        <Navbar></Navbar>

        <div className='mt-10 text-white'>
          <p style={{ fontFamily: "Chakra Petch" }} className='text-3xl '>Product results for {router.query.param}</p>
        </div>
        {!loadingProduct && lastDrop2.length == 0 && <h1 className='text-center text-2xl py-10'>No result found</h1>}
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center lg:flex-row flex-col'>
          {loadingProduct &&
            <div className='w-full'>
              <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
            </div>
          }
        </div>
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center lg:flex-row flex-col lg:grid grid-cols-5 gap-5'>
          {lastDrop2?.map(function (data, index) {
            return (
              <Link href={`/payment/${data._id}`} key={index}>
                <a>
                  <div style={{ width: "194px", background: "#161A42" }} className=''>
                    <div style={{ borderRadius: '8px' }} className=' bg-white m-2 relative'>
                      <div className='relative top-2 left-2'>
                        {/* <Image height={20} width={60} src={data.title}></Image> */}
                      </div>
                      <div style={{ borderRadius: '8px' }} className=' flex justify-center items-center'>

                        <div className='w-full h-48 relative'>
                          <Image src={data.imageUrl}
                            width="95%" height="95%" layout="responsive" objectFit="contain"
                          ></Image>
                        </div>
                      </div>
                      <div className='category'>
                        {data.category == 'music' && <Image className='music' src={music} />}
                        {data.category == 'movies' && <Image className='movies' src={movies} />}
                        {data.category == 'games' && <Image className='games' src={games} />}
                        {data.category == 'sports' && <Image className='sports' src={sports} />}
                        {data.category == 'comics' && <Image className='comics' src={comics} />}
                        {data.category == 'art' && <Image className='art' src={art} />}
                      </div>
                    </div>
                    <div className='p-3'>
                      <p className='text-lg text-white'>{data.name}</p>

                      <div className='relative flex items-center mt-3'>

                        <p className='absolute right-0 text-white'>Serie 1</p>
                      </div>

                      <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                      </div>
                      <div style={{ fontFamily: "Poppins" }} className='flex items-center relative mt-4'>
                        <p style={{ color: "#0EA8D6" }} className='text-white text-2xl'>{data.priceUsd}$</p>
                        <p style={{ color: "#0EA8D6" }} className='ml-1 text-lg '>{data.priceMatic}</p>
                        <Image src={polygon}></Image>
                        <p className='absolute right-0'>{data.divide}</p>
                      </div>

                      <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                      </div>
                      <div className='flex items-center justify-center mt-2'>
                        <p style={{ fontFamily: "Chakra Petch" }} className='text-white'>COLLECT</p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
        <div className='mt-20 text-white'>
          <p style={{ fontFamily: "Chakra Petch" }} className='text-3xl '>Brand results for {router.query.param}</p>
        </div>
        {!loadingBrand && brands.length == 0 && <h1 className='text-center text-2xl py-10'>No result found</h1>}
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center lg:flex-row flex-col'>
          {loadingBrand &&
            <div className='w-full'>
              <Skeleton containerClassName='flex justify-between lg:flex-row flex-col items-center' className='loading-bar' inline={true} count={5} height={'170px'} width={'150px'} />
            </div>
          }
        </div>
        <div style={{ fontFamily: "Chakra Petch" }} className='mt-5 flex items-center lg:flex-row flex-col lg:grid grid-cols-5 gap-5'>

          {brands?.map(function (data, index) {
            return (
              <Link href={`/collection/${data._id}`} key={index}>
                <a>
                  <div key={index} onClick={function () { router.push(`/collection/${data._id}`); }} style={{ width: "194px", height: "261px", background: "#161A42" }} className='mt-5 flex items-start justify-start flex-col cursor-pointer'>
                    <div className='w-full flex flex-col justify-center items-end h-5/6 relative'>
                      <div className='w-full h-full mt-28'>
                        {checkURLisValid(data.logoUrl) && <div className='w-full h-48 relative'>
                          <Image src={data.logoUrl}
                            width="95%" height="95%" layout="responsive" objectFit="contain"
                          ></Image>
                        </div>}
                      </div>
                      <div className='absolute w-full'>
                        {checkURLisValid(data.imageUrl) && <div className='w-full h-48 relative'>
                          <img src={data.imageUrl} className="w-full" />
                        </div>}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
        <Footer></Footer>
      </div>
    </div>
  )
}
