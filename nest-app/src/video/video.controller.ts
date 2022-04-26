import { Controller, Get, Res, Headers } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream, Stats, statSync } from 'fs';

@Controller('video') // http://localhost:3000/video
export class VideoController {
  @Get() // Big_Buck_Bunny_1080_10s_1MB.mp4
  getBunnyVideo(
    @Headers() headers: { range: string },
    @Res() response: Response,
  ) {
    const videoPath = join(__dirname, '/Big_Buck_Bunny_1080_10s_1MB.mp4');
    const stat: Stats = statSync(videoPath);
    const videoSize: number = parseInt(String(stat.size));
    const range = headers.range;

    if (range) {
      // bytes=0-
      const chunkSize = Math.pow(10, 3); // 1MB
      const parts: string[] = range.replace(/bytes=/, '').split('-'); // [ 0, 100 ]
      const start: number = parseInt(parts[0]);
      const end: number = Math.min(start + chunkSize, videoSize - 1);

      const file = createReadStream(videoPath, { start, end });
      const head: any = {
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Content-Type': 'video/mp4',
      };
      response.writeHead(206, head);
      file.pipe(response);
    }
  }
}
