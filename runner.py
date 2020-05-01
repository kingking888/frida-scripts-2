#!/usr/bin/python3

import frida
import sys
import time
import argparse

def parse_hook(filename):
  print(f"[*] Parsing hook: {filename}")
  hook = open(filename, 'r')
  script = session.create_script(hook.read())
  script.load()

if __name__ == '__main__':
  try:
    parser = argparse.ArgumentParser()
    parser.add_argument('package', help='spawn a new process and attach')
    parser.add_argument('script', help='script to execute')
    args = parser.parse_args()

    print(f"[*] Spawning {args.package}")

    pid = frida.get_usb_device().spawn(args.package)
    frida.get_usb_device().resume(pid)
    time.sleep(1)
    session = frida.get_usb_device().attach(pid)
    parse_hook(args.script)

    sys.stdin.read()
  except KeyboardInterrupt:
    sys.exit(0)
