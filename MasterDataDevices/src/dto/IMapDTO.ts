
export default interface IMapDTO {
    name:string,
    size: { width: number , depth: number },
    map: number[][],
    player:{
      "initialPosition": number[],
      "initialDirection": number
    },
    floorId:string,
    buildingId:string
  }
  