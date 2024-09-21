export function createDeviceStore(uniqueDeviceId: string) {
    return {
        async getWaitlistStatus() {
            return { waitlistEntered: true, waitlistPosition: Math.round(Math.random() * 10000), estimatedTimeRemaining: Math.round((1 + (14 * Math.random())) * 24 * 60 * 60 * 1000) };
        },
    }
}

export type DeviceStore = ReturnType<typeof createDeviceStore>;