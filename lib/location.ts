/**
 * Round coordinates to ~100m precision (3 decimal places)
 * This protects user privacy by preventing exact address identification
 * 
 * @param coord - The coordinate to round (latitude or longitude)
 * @returns Rounded coordinate
 */
export function roundCoordinate(coord: number): number {
  return Math.round(coord * 1000) / 1000
}

/**
 * Get user's current location from browser
 * Returns rounded coordinates for privacy
 */
export async function getCurrentLocation(): Promise<{
  latitude: number
  longitude: number
} | null> {
  if (!navigator.geolocation) {
    return null
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: roundCoordinate(position.coords.latitude),
          longitude: roundCoordinate(position.coords.longitude),
        })
      },
      (error) => {
        console.error("Error getting location:", error)
        resolve(null)
      }
    )
  })
}