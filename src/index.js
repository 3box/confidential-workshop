const SPACE_NAME = 'workshop'

const nameMap = {}

async function start () {
  //const box = // TODO -create 3box instance
  window.box = box
  authButton.disabled = false
  //const thread = // TODO - open ghostThread with SPACE_NAME and 'chat'
  window.ghostThread = thread

  ghostButton.addEventListener('click', event => {
    const content = ghostPost.value
    // TODO - post content to thread
  })

  // TODO - thread onUpdate updateGhostPosts
}

start()

async function updateGhostPosts () {
  //const posts = // TODO - getPost from ghostThread

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
      //const { name } = // TODO - getProfile
      nameMap[did] = name
    }
  }))
}

authButton.addEventListener('click', async event => {
  authButton.disabled = true

  const address = (await window.ethereum.enable())[0]
  // TODO - auth 3box to SPACE_NAME with address
  ghostButton.disabled = false
  controlls.style.display = 'block'
  updateNameData(box)

  setName.addEventListener('click', async () => {
    // TODO set name to pubName.value
  })

  //window.currentSpace = // TODO - open SPACE_NAME

  // TODO - await syncDone
  updateNameData(box)
})

async function updateNameData(box) {
  //pubName.value = // TODO - get public name
}

joinConfThread.addEventListener('click', async () => {
  const address = confThreadAddress.value
  displayThread(true)
  try {
    //const thread = // TODO - join thread by address
    registerThreadEvents(thread)
  } catch (e) {
    updateThreadError(e)
  }
})

createConfThread.addEventListener('click', async () => {
  const name = confThreadName.value
  displayThread(true)
  try {
    //const thread = // TODO - create confidential thread with name
    registerThreadEvents(thread)
  } catch (e) {
    updateThreadError(e)
  }
})

addThreadMod.addEventListener('click', async () => {
  const id = threadMod.value
  try {
    // TODO - addModerator with id
    updateThreadCapabilities()
  } catch (e) {
    updateThreadError(e)
  }
})

addThreadMember.addEventListener('click', async () => {
  const id = threadMember.value
  try {
    // TODO - addMember with id
    updateThreadCapabilities()
  } catch (e) {
    updateThreadError(e)
  }
})

window.deletePost = async ({ id }) => {
  try {
    // TODO - deletePost id
    updateThreadData()
  } catch (e) {
    updateThreadError(e)
  }
}

const registerThreadEvents = thread => {
  window.currentThread = thread
  // TODO - onUpdate: updateThreadData
  // TODO - onNewCapabilities: updateThreadCapabilities
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
  //threadAddress.innerHTML = // TODO - currentThread.address
  updateThreadError()
  //const posts = // TODO - get posts
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
  //const members = // TODO - listMembers
  members.map(member => {
      threadMemberList.innerHTML += member + '<br />'
  })
  threadModeratorList.innerHTML = ''
  //const moderators = // TODO - listModerators
  moderators.map(moderator => {
      threadModeratorList.innerHTML += moderator  +  '<br />'
  })
}

postThread.addEventListener('click', async () => {
  try {
    // TODO - post postMsg.value
  } catch (e) {
    updateThreadError(e)
  }
})
