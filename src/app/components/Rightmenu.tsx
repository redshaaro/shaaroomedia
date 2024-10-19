import React from 'react'
import Friendrequests from './Friendrequests'
import Birthdays from './Birthdays'
import Sponsoredads from './Sponsoredads'
import Userinfo from './Userinfo'
import Usermedia from './Usermedia'
import { auth } from '@clerk/nextjs/server'

const Rightmenu = ({ userid }: { userid?: string }) => {
  const { userId: currentuserid } = auth()
  return (


    <div>
      {
        userid ? <><Userinfo userid={userid}></Userinfo><Usermedia userid={userid}></Usermedia> </> : null

      }

      <Friendrequests currentuserid={currentuserid}></Friendrequests>
      <Birthdays></Birthdays>
      <Sponsoredads></Sponsoredads>
    </div>
  )
}

export default Rightmenu