export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold">404 - Page Not Found</h1>
        <p className="text-sm text-muted-foreground">The page you are looking for doesn't exist.</p>
        <a href="/dashboard" className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground">
          Back to Dashboard
        </a>
      </div>
    </div>
  )
}


