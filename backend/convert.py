# import sys
# import os
# from pdf2docx import Converter

# def convert_pdf_to_docx(input_path, output_path):
#     try:
#         cv = Converter(input_path)
#         cv.convert(output_path, start=0, end=None)
#         cv.close()
#         print(f"✅ Conversion successful: {output_path}")
#     except Exception as e:
#         print(f"❌ Conversion failed: {e}")
#         sys.exit(1)

# if __name__ == "__main__":
#     if len(sys.argv) < 3:
#         print("Usage: python convert.py <input.pdf> <output.docx>")
#         sys.exit(1)

#     input_file = sys.argv[1]
#     output_file = sys.argv[2]

#     if not os.path.exists(input_file):
#         print(f"❌ Input file not found: {input_file}")
#         sys.exit(1)

#     convert_pdf_to_docx(input_file, output_file)


import sys
from pdf2docx import Converter

if len(sys.argv) != 3:
    print("Usage: python convert.py input.pdf output.docx")
    sys.exit(1)

input_file = sys.argv[1]
output_file = sys.argv[2]

try:
    cv = Converter(input_file)
    cv.convert(output_file, start=0, end=None)
    cv.close()
    print(f"Conversion successful: {output_file}")
except Exception as e:
    print(f"Conversion failed: {e}")
    sys.exit(1)
