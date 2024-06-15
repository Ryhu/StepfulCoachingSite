import * as React from 'react'
import { useState } from 'react'

import style from './HelloWorld.module.css'
import logo from './logo.svg'

const HelloWorld = ({ incommingName }) => {
  const [name, setName] = useState(incommingName)

  return (
    <>
      <img src={logo} className={style.logo} alt="logo" />
      <hr />
      <form>
        <label className={style.bright} htmlFor="name">
          Say hello to:{' '}
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </form>
    </>
  )
}

export default HelloWorld
