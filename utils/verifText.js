export default function verifText(verif) {
  if (verif === 0) {
    return `Waiting`
  }

  if (verif === 1) {
    return `Verified`
  }

  if (verif === -1) {
    return `Terminated`
  }
}
