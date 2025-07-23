import { handlers } from '@/auth';
import { NextRequest } from 'next/server';

// Wrapper para adicionar logs
const loggedGET = async (req: NextRequest) => {
  console.log('🌐 GET Request para NextAuth:', {
    url: req.url,
    method: req.method,
    headers: Object.fromEntries(req.headers.entries()),
    timestamp: new Date().toISOString()
  });
  
  try {
    const result = await handlers.GET(req);
    console.log('✅ GET Response:', {
      status: result?.status,
      timestamp: new Date().toISOString()
    });
    return result;
  } catch (error) {
    console.error('❌ Erro no GET:', error);
    throw error;
  }
};

const loggedPOST = async (req: NextRequest) => {
  console.log('🌐 POST Request para NextAuth:', {
    url: req.url,
    method: req.method,
    headers: Object.fromEntries(req.headers.entries()),
    timestamp: new Date().toISOString()
  });
  
  try {
    const result = await handlers.POST(req);
    console.log('✅ POST Response:', {
      status: result?.status,
      timestamp: new Date().toISOString()
    });
    return result;
  } catch (error) {
    console.error('❌ Erro no POST:', error);
    throw error;
  }
};

export { loggedGET as GET, loggedPOST as POST };