import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { Institution } from '../api/institutions'

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface LeafletMapProps {
  institutions: Institution[]
  onInstitutionSelect: (institution: Institution) => void
  selectedInstitution: Institution | null
}

export function LeafletMap({ institutions, onInstitutionSelect, selectedInstitution }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map centered on Uzbekistan
    const map = L.map(mapRef.current).setView([41.377491, 64.585262], 6)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current || !institutions.length) return

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker)
    })
    markersRef.current = []

    // Create custom icon for institutions
    const institutionIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: #3b82f6;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          background-color: white;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        "></div>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })

    // Add markers for institutions
    institutions.forEach(institution => {
      const [lat, lng] = institution.location.coordinates

      // Validate coordinates
      if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        console.warn(`Invalid coordinates for institution ${institution.name}:`, institution.location.coordinates)
        return
      }

      const marker = L.marker([lat, lng], { icon: institutionIcon })
        .bindPopup(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="font-weight: 600; font-size: 14px; margin-bottom: 4px; color: #1f2937;">${institution.name}</h3>
            <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">${institution.type}</p>
            <p style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">📍 ${institution.location.district}, ${institution.location.region}</p>
            <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">👥 Capacity: ${institution.capacity.toLocaleString()}</p>
            <button onclick="window.selectInstitution('${institution._id}')" style="
              background-color: #3b82f6;
              color: white;
              border: none;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              cursor: pointer;
            ">View Details</button>
          </div>
        `)
        .on('click', () => {
          onInstitutionSelect(institution)
        })

      if (mapInstanceRef.current) {
        marker.addTo(mapInstanceRef.current)
        markersRef.current.push(marker)
      }
    })

      // Set up global function for popup button
      ; (window as any).selectInstitution = (institutionId: string) => {
        const institution = institutions.find(inst => inst._id === institutionId)
        if (institution) {
          onInstitutionSelect(institution)
        }
      }

    // Fit map to show all markers if there are institutions
    if (institutions.length > 0 && mapInstanceRef.current) {
      const group = new L.featureGroup(markersRef.current)
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1))
    }

  }, [institutions, onInstitutionSelect])

  useEffect(() => {
    if (!mapInstanceRef.current || !selectedInstitution) return

    const [lat, lng] = selectedInstitution.location.coordinates
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      mapInstanceRef.current.setView([lat, lng], 10)
    }
  }, [selectedInstitution])

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    />
  )
}