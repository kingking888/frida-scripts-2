#!/usr/bin/python3

import frida
import sys
import time
import argparse

def get_op_mode_string(opmode):
  op_mode_map = {
    1: "encryption",
    2: "decryption",
    3: "key wrapping",
    4: "key unwrapping"
  }
  return op_mode_map.get(opmode, "")

def parse_hook(filename):
  print(f"[*] Parsing hook: {filename}")
  with open(filename, 'r') as hook:
    script = session.create_script(hook.read())
  script.on('message', on_message)
  script.load()

def on_message(message, data):
  try:
    if message:
      if message['type'] == 'send':
        payload = message['payload']
        method = payload['method']
        args = payload['args']
        details = payload['details']
        print(f"[+] Method: {method}")
        print("[ ] Arguments:")

        for item in args:
          name = item['name']
          value = item['value']
          if name == "opmode":
            value = get_op_mode_string(value)
          print(f"[ ]   {name}: {value}")
        print("[ ] Additional Details:")
        for item in details:
          name = item['name']
          value = item['value']
          print(f"[ ]   {name}: {value}")
        print('')
  except Exception as e:
    print(f"Exception {e}")

if __name__ == '__main__':
  try:
    parser = argparse.ArgumentParser()
    parser.add_argument('package', help='Spawn a new process and attach')
    parser.add_argument('script', help='Print stack trace for each hook')
    args = parser.parse_args()

    print('[*] Spawning ' + args.package)
    pid = frida.get_usb_device().spawn(args.package)
    frida.get_usb_device().resume(pid)
    time.sleep(1)
    session = frida.get_usb_device().attach(pid)
    parse_hook(args.script)

    print('')

    sys.stdin.read()
  except KeyboardInterrupt:
    sys.exit(0)

