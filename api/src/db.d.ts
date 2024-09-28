/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string>;

export type WaitlistAgeGroup = "18-25" | "26-35" | "36-45" | "46-55" | "56-65" | "66-75" | "76-85" | "86-95" | "other";

export type WaitlistGender = "f" | "m" | "o";

export interface DeviceCheckins {
  androidId: string | null;
  buildNumber: string;
  buildType: string;
  buildVersion: string;
  createdAt: Generated<Timestamp>;
  deviceId: string;
  deviceToken: string | null;
  deviceType: string;
  deviceUniqueId: string;
  hash: string;
  instanceId: string | null;
  isTablet: boolean;
  manufacturer: string;
  systemName: string;
  systemVersion: string;
  updatedAt: Generated<Timestamp>;
}

export interface Devices {
  createdAt: Generated<Timestamp>;
  uniqueId: string;
  updatedAt: Generated<Timestamp>;
}

export interface LoginPieces {
  applicationKey: string;
  applicationKeySlot: number;
  cardUid: string;
  createdAt: Generated<Timestamp>;
  masterKey: string;
  pin: string;
  updatedAt: Generated<Timestamp>;
}

export interface LoginSessions {
  cardUid: string;
  createdAt: Generated<Timestamp>;
  randA: string;
}

export interface WaitlistMembers {
  ageGroup: WaitlistAgeGroup;
  countryISO: string;
  createdAt: Generated<Timestamp>;
  deviceUniqueId: string;
  gender: WaitlistGender;
  pushToken: string;
  updatedAt: Generated<Timestamp>;
}

export interface DB {
  device_checkins: DeviceCheckins;
  devices: Devices;
  login_pieces: LoginPieces;
  login_sessions: LoginSessions;
  waitlist_members: WaitlistMembers;
}
