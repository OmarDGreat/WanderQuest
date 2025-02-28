import { ImageWithFallback } from '../../common';

export default function WeatherIcon({ icon, description, className = "" }) {
  return (
    <ImageWithFallback
      src={`https://openweathermap.org/img/wn/${icon}.png`}
      fallbackSrc={`/weather-icons/${icon}.png`} // Local fallback icons
      alt={description}
      className={`w-8 h-8 ${className}`}
      placeholderText={description?.substring(0, 2).toUpperCase() || 'W'}
    />
  );
}
