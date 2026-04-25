from embedding import ImageEmbedder
from PIL import Image

# create embedder
embedder = ImageEmbedder.create()

# load image
img = Image.open("test.jpg")  # put any image in project folder

# generate embedding
vec = embedder.embed_pil_images([img])

print("Shape:", vec.shape)
print("First 10 values:", vec[0][:10])