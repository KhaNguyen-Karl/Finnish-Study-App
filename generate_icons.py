import zlib
import struct

def make_png(width, height, path):
    # Generates a clean PNG with Finnish flag blue background, white circle and Nordic cross / speech icon
    raw_data = bytearray()
    
    # Colors
    bg_r, bg_g, bg_b = 0, 53, 128     # Finnish Blue (#003580)
    fg_r, fg_g, fg_b = 255, 255, 255 # White
    accent_r, accent_g, accent_b = 245, 158, 11 # Amber gold
    
    center_x = width / 2
    center_y = height / 2
    radius = width * 0.42
    
    for y in range(height):
        raw_data.append(0) # Filter type 0: None
        for x in range(width):
            dx = x - center_x
            dy = y - center_y
            dist = (dx*dx + dy*dy)**0.5
            
            # Rounded squircle icon background
            corner_r = width * 0.22
            in_rect_x = abs(dx) < (width/2 - corner_r)
            in_rect_y = abs(dy) < (height/2 - corner_r)
            corner_dist = ((abs(dx) - (width/2 - corner_r))**2 + (abs(dy) - (height/2 - corner_r))**2)**0.5
            
            is_inside_app = in_rect_x or in_rect_y or (corner_dist <= corner_r)
            
            if not is_inside_app:
                raw_data.extend([0, 0, 0, 0])
                continue
                
            # Inside the icon: blue background with white cross & gold speech bubble
            # Cross vertical bar: 0.35 * width to 0.47 * width
            is_cross_v = (width * 0.33 <= x <= width * 0.45) and (height * 0.2 <= y <= height * 0.8)
            # Cross horizontal bar: 0.42 * height to 0.54 * height
            is_cross_h = (height * 0.41 <= y <= height * 0.53) and (width * 0.2 <= x <= width * 0.8)
            
            # Gold flame / star dot top right
            fx = x - (width * 0.72)
            fy = y - (height * 0.28)
            is_flame = (fx*fx + fy*fy)**0.5 <= (width * 0.1)
            
            if is_flame:
                raw_data.extend([accent_r, accent_g, accent_b, 255])
            elif is_cross_v or is_cross_h:
                raw_data.extend([fg_r, fg_g, fg_b, 255])
            else:
                raw_data.extend([bg_r, bg_g, bg_b, 255])

    def chunk(tag, data):
        return struct.pack('!I', len(data)) + tag + data + struct.pack('!I', zlib.crc32(tag + data) & 0xffffffff)

    header = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('!IIBBBBB', width, height, 8, 6, 0, 0, 0))
    idat = chunk(b'IDAT', zlib.compress(bytes(raw_data), 9))
    iend = chunk(b'IEND', b'')

    with open(path, 'wb') as f:
        f.write(header + ihdr + idat + iend)

make_png(192, 192, 'icons/icon-192.png')
make_png(512, 512, 'icons/icon-512.png')
print("Generated icons successfully.")
