// 基本 -------------
let renderer = ''
let camera = ''
let scene = ''
let threedObj = ''
let cameraControls = ''

// 球
let earth = ''
const zoomFactor = 0.001;
const EARTH_RADIUS = 6371 // km
const ELEVATION_HEIGHT = 600 // km
const radius = (EARTH_RADIUS + ELEVATION_HEIGHT) * zoomFactor

// galaxy
let galaxyObj = ''
