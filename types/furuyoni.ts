export interface FuruyoniTableCreateRes {
  p1Url: string;
  p2Url: string;
  watchUrl: string;
  deleteKey: string;
}

export interface FuruyoniTableDeleteReq {
  tableNo: string; // 観戦用URLから
  p1Key: string; // プレイヤー1の参加用URLから
  p2Key: string; // プレイヤー2の参加用URLから
  deleteKey: string;
  isGen2: boolean; // always true
}

export interface FuruyoniTableDeleteRes {
  ok: boolean;
}
