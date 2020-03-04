const SPACE_NAME = 'workshop'

const nameMap = {}

async function start () {
  // TODO
  const box = await Box.create(window.ethereum)
  window.box = box
  authButton.disabled = false
  const thread = await box.openThread(SPACE_NAME, 'chat', { ghost: true })
  window.ghostThread = thread

  ghostButton.addEventListener('click', event => {
    const content = ghostPost.value
    console.log('cont' ,content)
    thread.post(content)
  })

  thread.onUpdate(async () => {
    updateGhostPosts()
  })
}

start()

async function updateGhostPosts () {
  // TODO
  const posts = await ghostThread.getPosts()

  const dids = posts.map(post => post.author)
  await fetchMissingNames(dids)

  const content = posts.map(post => {
    const name = `${nameMap[post.author]} (${post.author})` || post.author
    return name + ': \n' + post.message + '\n'
  }).join('\n')
  ghostData.value = content
  ghostData.scrollTop = ghostData.scrollHeight
}

async function fetchMissingNames (dids) {
  return Promise.all(dids.map(async did => {
    if (!nameMap[did]) {
      // TODO
      const { name } = await Box.getProfile(did)
      nameMap[did] = name
    }
  }))
}

authButton.addEventListener('click', async event => {
  authButton.disabled = true

  const addresses = await window.ethereum.enable()
  await window.box.auth([SPACE_NAME], { address: addresses[0] })
  console.log('authed')
  ghostButton.disabled = false
  controlls.style.display = 'block'
  updateNameData(box)

  setName.addEventListener('click', async () => {
    // TODO
    await box.public.set('name', pubName.value)
  })

  window.currentSpace = await box.openSpace(SPACE_NAME)

  await box.syncDone
  updateNameData(box)
})

async function updateNameData(box) {
  // TODO
  pubName.value = await box.public.get('name')
}

joinConfThread.addEventListener('click', async () => {
  const address = confThreadAddress.value
  displayThread(true)
  try {
    const thread = await window.currentSpace.joinThreadByAddress(address)
    registerThreadEvents(thread)
  } catch (e) {
    updateThreadError(e)
  }
})

createConfThread.addEventListener('click', async () => {
  const name = confThreadName.value
  displayThread(true)
  try {
    const thread = await window.currentSpace.createConfidentialThread(name)
    registerThreadEvents(thread)
  } catch (e) {
    updateThreadError(e)
  }
})

addThreadMod.addEventListener('click', async () => {
  const id = threadMod.value
  try {
    await window.currentThread.addModerator(id)
    updateThreadCapabilities()
  } catch (e) {
    updateThreadError(e)
  }
})

addThreadMember.addEventListener('click', async () => {
  const id = threadMember.value
  try {
    await window.currentThread.addMember(id)
    updateThreadCapabilities()
  } catch (e) {
    updateThreadError(e)
  }
})

window.deletePost = async (el) => {
  try {
    await window.currentThread.deletePost(el.id)
    updateThreadData()
  } catch (e) {
    updateThreadError(e)
  }
}

const registerThreadEvents = thread => {
  window.currentThread = thread
  thread.onUpdate(() => {
    updateThreadData()
  })
  thread.onNewCapabilities(() => {
    updateThreadCapabilities()
  })
  updateThreadData()
  updateThreadCapabilities()
}

const displayThread = (members) => {
  posts.style.display = 'block'
  threadModeration.style.display = 'block'
  if (members) threadMembers.style.display = 'block'
}

const updateThreadError = (e = '') => {
  threadACError.innerHTML = e
}

const updateThreadData = async () => {
  threadAddress.innerHTML = window.currentThread.address
  updateThreadError()
  // TODO
  const posts = await window.currentThread.getPosts()
  const dids = posts.map(post => post.author)
  await fetchMissingNames(dids)
  threadData.innerHTML = ''
  posts.map(post => {
    threadData.innerHTML += nameMap[post.author] + ': <br />' + post.message  + '<br /><br />'
    threadData.innerHTML += `<button id="` + post.postId + `"onClick="window.deletePost(` + post.postId + `)" type="button" class="btn btn btn-primary" >Delete</button>` + '<br /><br />'
  })
}

const updateThreadCapabilities = async () => {
  threadMemberList.innerHTML = ''
  const members = await window.currentThread.listMembers()
  members.map(member => {
      threadMemberList.innerHTML += member + '<br />'
  })
  threadModeratorList.innerHTML = ''
  const moderators = await window.currentThread.listModerators()
  moderators.map(moderator => {
      threadModeratorList.innerHTML += moderator  +  '<br />'
  })
}

postThread.addEventListener('click', async () => {
  try {
    // TODO
    await window.currentThread.post(postMsg.value)
  } catch (e) {
    updateThreadError(e)
  }
})
