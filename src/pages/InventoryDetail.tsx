import { useParams } from "react-router-dom"
import React from "react"
import DeviceDetailPage from "@/app/inventory/[deviceId]/page"

export default function InventoryDetailRoute() {
  // Provide params compatibility if needed in future
  const params = useParams()
  return <DeviceDetailPage />
}


