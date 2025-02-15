export default function WeatherIcon({ icon, description, className = "" }) {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}.png`}
      alt={description}
      className={`w-8 h-8 ${className}`}
    />
  );
}
