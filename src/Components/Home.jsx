import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
const music = require.context('../Music')
import { LuDot } from "react-icons/lu";
import Accordion from 'react-bootstrap/Accordion';
import './Home.css'
import { FaStepForward, FaStepBackward, FaVolumeMute, FaPause, FaVolumeUp, FaPlay, FaRegHeart } from "react-icons/fa";
import { baseURL } from './baseUrl';
function Home() {

  const [allSongs, setAllSongs] = useState([])
  const [song, setSong] = useState({})
  const searchRef = useRef(null)
  const accordionRef = useRef(null)
  const [playPause, setPlayPause] = useState(false)
  const [muteSong, setMuteSong] = useState(false)
  const audioRef = useRef()
  const trackRef = useRef(null)

  // All songs
  const getAllSongs = async () => {
    const { data } = await axios.get(`${baseURL}/songs`)
    setAllSongs(data)
  }

  // Select a song from all songs
  const clickSong = (thisSong) => {
    setSong(thisSong)
    accordionRef.current.style.visibility = "visible"
    setPlayPause(false)
    
  }

  // Play and pause
  function onPlayPauseBtn() {
    if (playPause == false) {
      setPlayPause(true)
      audioRef.current.pause()
      trackRef.current.src = 'https://i.postimg.cc/MHtg13DH/23-46-52-835-512-88.png'
    } else if (playPause == true) {
      setPlayPause(false)
      audioRef.current.play()
      trackRef.current.src = 'https://cdn.pixabay.com/animation/2024/01/13/23/46/23-46-52-835_512.gif'
    }
  }

  // Mute and unmute
  function onMuteBtn() {
    if (muteSong == false) {
      setMuteSong(true)
      audioRef.current.muted = true
    } else if (muteSong == true) {
      setMuteSong(false)
      audioRef.current.muted = false
    }
  }

  // Next song
  const onNextBtn = async (currentSongId) => {
    currentSongId += 1
    const { data } = await axios.get(`${baseURL}/songs/${currentSongId}`)
    setSong(data)
    setPlayPause(false)
  }

  // Previous song
  const onPrevBtn = async (currentSongId) => {
    currentSongId -= 1
    const { data } = await axios.get(`${baseURL}/songs/${currentSongId}`)
    setSong(data)
    setPlayPause(false)
  }

  useEffect(() => {
    getAllSongs()
  }, [])

  return (
    <div className='col-9'>

      <div>
        {/* Searchbar */}
        <Row className='justify-content-center mb-1'>
          <input type="search" ref={searchRef} list='searchSong' className='w-75 py-1 px-3 bg-dark border-0 text-white' style={{ borderRadius: '10px', height: '40px' }} placeholder='Search songs, albums, artists, podcasts' />
          <datalist id='searchSong'>
            {
              allSongs.map((song) => (
                <option>{song.name}</option>
              ))
            }
          </datalist>
        </Row>

        {/* All songs */}
        <Row className='pt-5' style={{ marginLeft: "150px" }}>
          <p>Start Radio From A Song</p>
          <h3 style={{ fontWeight: "1000", marginTop: "-10px" }}>Quick picks</h3>

          {/* All songs */}
          <Row className='p-3 px-3'>
            {
              allSongs.map((songItem) => (
                <Col className='col-5 m-2 d-flex' onClick={() => clickSong(songItem)} style={{ height: "50px" }}>
                  <div className='col-2'>
                    <img src={songItem.thumbnail} width="100%" height="90%" className='rounded' style={{ cursor: "pointer" }} />
                  </div>
                  <div className='col-10 px-2'>
                    <p style={{ fontSize: "17px" }}>{(songItem.name).slice(0, 25)}...</p>
                    <p style={{ marginTop: "-16px", fontSize: "13px", color: "gray" }}><span>{(songItem.singer).slice(0, 28)}</span> <span style={{ float: "right" }}><LuDot />0{songItem.duration}<LuDot /></span></p>
                  </div>
                </Col>
              ))
            }
          </Row>
        </Row>
      </div>

      {/* Now playing */}
      <div className='w-75' style={{ position: "fixed", bottom: "40px", zIndex: "1", visibility: "hidden" }}>
        <Accordion ref={accordionRef} defaultActiveKey="0" alwaysOpen>
          <Accordion.Item eventKey="0">

            {/* Song details, controls, listsongs  */}
            <Accordion.Body>
              <div className='d-flex'>
                <Col className='col-7 px-4 py-2 justify-content-center align-items-center'>

                  {/* Song image and name */}
                  <div className='text-center'>
                    <img src={song.thumbnail} height="330px" width="490px" className='rounded' />
                    <p className='mt-2' style={{ fontSize: "27px", fontWeight: "900" }}>{song.name}</p>
                    <audio src={song.url} ref={audioRef} autoPlay></audio>
                    <p style={{ marginTop: "-18px", fontSize: "15px", color: "gray" }}>{song.singer}</p>
                    {/* <input className='w-75 mb-3' style={{ height: "3px" }} type="range" /> */}
                    {/* <p className='px-3' style={{marginTop:"-15px"}}><span style={{float:"left"}}>00:00</span><span style={{float:"right"}}>{song.duration}</span></p> */}
                  </div>

                  {/* Controls */}
                  <div className='px-4 py-2 justify-content-center d-flex'>
                    <button onClick={onMuteBtn} className='border-0 text-warning mx-4' style={{ backgroundColor: "#222222" }}>{muteSong ? <FaVolumeMute className='fa-lg' /> : <FaVolumeUp className='fa-lg' />}</button>
                    <button onClick={() => onPrevBtn(song.id)} className='border-0 text-white mx-4' style={{ backgroundColor: "#222222" }}><FaStepBackward className='fa-lg' /></button>
                    <button onClick={onPlayPauseBtn} className='border-0 text-white mx-4' style={{ backgroundColor: "#222222" }}>{playPause ? <FaPlay className='fa-xl' /> : <FaPause className='fa-xl' />}</button>
                    <button onClick={() => onNextBtn(song.id)} className='border-0 text-white mx-4' style={{ backgroundColor: "#222222" }}><FaStepForward className='fa-lg' /></button>
                    <button className='border-0 text-info mx-4' style={{ backgroundColor: "#222222" }}><FaRegHeart className='fa-lg' /></button>
                  </div>
                </Col>

                {/* Songs */}
                <Col className='col-5 ps-5 py-2 rounded' style={{ height: "470px", overflow: "auto" }}>
                  <p style={{ fontSize: "18px" }}>UP NEXT</p>
                  {
                    allSongs.map((songgg) => (
                      <div className='d-flex my-2 p-1 rounded' style={{ height: "52px" }}>
                        <div className='col-2'>
                          <img src={songgg.thumbnail} width="100%" height="100%" className='rounded' />
                        </div>
                        <div className='col-8 px-2'>
                          <p style={{ fontSize: "16px" }}>{(songgg.name).slice(0, 24)}</p>
                          <p style={{ marginTop: "-16px", fontSize: "13px", color: "gray" }}>{(songgg.singer).slice(0, 25)}</p>
                        </div>
                        <div className='col-1 py-2'>
                          <p className='text-center' style={{ fontSize: "13px", color: "gray" }}>0{songgg.duration}</p>
                        </div>
                      </div>
                    ))
                  }
                </Col>
              </div>
            </Accordion.Body>

            {/* Now playing header */}
            <Accordion.Header>
              <div className='mx-5 col-4 d-flex' style={{ height: "45px" }}>
                <div className='col-2'>
                  <img src={song.thumbnail} width="100%" height="90%" className='rounded' style={{ cursor: "pointer" }} />
                </div>
                <div className='col-10 px-2'>
                  <p style={{ fontSize: "16px" }}>{song.name}</p>
                  <p style={{ marginTop: "-16px", fontSize: "13px", color: "gray" }}><span>{song.singer}</span> <span style={{ float: "right" }}><LuDot />0{song.duration}<LuDot /></span></p>
                </div>
              </div>
              <div className='px-5 mx-5'>
                <img ref={trackRef} src="https://cdn.pixabay.com/animation/2024/01/13/23/46/23-46-52-835_512.gif" height="50px" width="300px" alt="" />
              </div>
            </Accordion.Header>

          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  )
}

export default Home