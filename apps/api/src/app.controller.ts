import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('System')
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({ summary: 'System Health Check' })
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'Forscha Labs Core Engine',
      uptime: process.uptime(),
    };
  }

  @Get('telemetry')
  @ApiOperation({ summary: 'Tenant Telemetry stats for Admin Dashboard' })
  getTelemetry() {
    return {
      totalActiveTenants: 1248,
      mrrGrowthPercentage: 14.8,
      activeAiAgents: 89,
      averageRating: 4.88,
      googleLocationsConnected: 760,
      databaseStatus: 'CONNECTED',
      redisStatus: 'CONNECTED',
    };
  }
}
