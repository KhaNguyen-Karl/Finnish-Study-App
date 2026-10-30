#!/usr/bin/env python3
"""
SuomiPolku Local Server
Serves the Finnish learning app for local testing on Mac, Samsung (Android) and iPhone 15 (iOS).
"""
import http.server
import socketserver
import subprocess
import sys
import os

PORT = 8000

def get_wifi_ip():
    # Attempt to retrieve local Wi-Fi IP on macOS
    try:
        ip = subprocess.check_output(['ipconfig', 'getifaddr', 'en0'], stderr=subprocess.DEVNULL).decode().strip()
        if ip:
            return ip
    except Exception:
        pass
    try:
        ip = subprocess.check_output(['ipconfig', 'getifaddr', 'en1'], stderr=subprocess.DEVNULL).decode().strip()
        if ip:
            return ip
    except Exception:
        pass
    return '127.0.0.1'

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers for PWA
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    local_ip = get_wifi_ip()
    
    print("=" * 64)
    print(" 🇫🇮  SUOMIPOLKU - FINNISH B1.1 MASTERY APP")
    print("=" * 64)
    print("\n📱 ACCESS LINKS:")
    print(f"  • On this Mac:             http://localhost:{PORT}")
    print(f"  • On your Samsung phone:   http://{local_ip}:{PORT}")
    print(f"  • On your girlfriend's iPhone: http://{local_ip}:{PORT}")
    print("\n💡 HOW TO INSTALL ON HOMESCREEN:")
    print("  [Samsung / Android]:")
    print("    1. Open Chrome or Samsung Internet.")
    print(f"    2. Go to http://{local_ip}:{PORT}")
    print("    3. Tap ⋮ (menu) -> 'Install app' or 'Add to Home screen'.")
    print("  [iPhone 15 / iOS]:")
    print("    1. Open Safari.")
    print(f"    2. Go to http://{local_ip}:{PORT}")
    print("    3. Tap the Share button (square with arrow) -> 'Add to Home Screen'.")
    print("\n(Press Ctrl+C to stop the server)")
    print("=" * 64 + "\n")

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nPalvelin suljettu (Server stopped). Nähdään pian!")
            sys.exit(0)

if __name__ == '__main__':
    main()
