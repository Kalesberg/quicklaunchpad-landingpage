import polygon from './polygon.json'
import dogechain from './dogechain.json'
import zktestnet from './zktestnet.json'
import zkmainnet from './zkmainnet.json'
import manta from './manta.json'
import zkartana from './zkartana.json'
import tIMX from './tIMX.json'
import qlpmanager from './qlpmanager.json'
import x1 from './x1.json'
import IMX from './imx.json'
import astarZkevm from './astarzkevm.json'
import layerX from './layerx.json'
import orderlyFeeTiers from './orderlyFeeTiers.json'

enum ChainId {
  MUMBAI = 80001,
  MATIC = 137,
  DOEGCHAIN_TESTNET = 568,
  DOGECHAIN = 2000,
  ZKTESTNET = 1442,
  ZKEVM = 1101,
  KAVA = 2222,
  MANTA = 169,
  ZKATANA = 1261120,
  BTTC = 199,
  X1 = 195,
  TIMX = 13473,
  IMX = 13371,
  ASTARZKEVM = 3776,
  LAYERX = 196
}

const configs: any = {
  [ChainId.MATIC]: polygon,
  [ChainId.DOGECHAIN]: dogechain,
  [ChainId.ZKTESTNET]: zktestnet,
  [ChainId.ZKEVM]: zkmainnet,
  [ChainId.MANTA]: manta,
  [ChainId.ZKATANA]: zkartana,
  [ChainId.TIMX]: tIMX,
  [ChainId.X1]: x1,
  [ChainId.IMX]: IMX,
  [ChainId.ASTARZKEVM]: astarZkevm,
  [ChainId.LAYERX]: layerX,
}

export const getConfig = (network: ChainId | undefined) => {
  if (!network) {
    return configs[ChainId.MATIC]
  }
  const config = configs[network]
  return config
}

export const getQlpManager = () => {
  return qlpmanager
}

export const getOrderlyFeeTiers = () => {
  return orderlyFeeTiers
}

export const AML_SCORE_THRESHOLD = 7
