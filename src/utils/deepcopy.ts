interface Iresult {
  [key:string] : any
}

const deepcopy = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let result:Iresult
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for(let key in obj){
    result[key] = deepcopy(obj[key])
  }

  return result

}


export default deepcopy